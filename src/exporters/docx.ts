import {
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from 'docx'
import type { Question, QuestionPaper } from '../types'

function dataUrlBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1] ?? ''
  const bin = atob(base64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i)
  return bytes
}

async function normalizeImage(dataUrl: string): Promise<{ data: Uint8Array; type: 'jpg' | 'png' }> {
  if (dataUrl.startsWith('data:image/jpeg')) {
    return { data: dataUrlBytes(dataUrl), type: 'jpg' }
  }

  if (dataUrl.startsWith('data:image/png')) {
    return { data: dataUrlBytes(dataUrl), type: 'png' }
  }

  // docx@9 supports PNG/JPEG but not WebP. Convert unsupported browser
  // image formats through a canvas before embedding them in the DOCX.
  const image = new Image()
  image.src = dataUrl
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('Unable to decode image for DOCX export'))
  })

  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth || image.width
  canvas.height = image.naturalHeight || image.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to create image canvas for DOCX export')
  context.drawImage(image, 0, 0)

  const pngDataUrl = canvas.toDataURL('image/png')
  return { data: dataUrlBytes(pngDataUrl), type: 'png' }
}

function qParagraph(q: Question, i: number) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${i + 1}. `, bold: true }),
      new TextRun({ text: q.questionText }),
    ],
    bidirectional: q.direction === 'rtl',
  })
}

export async function exportPaperDocx(
  paper: QuestionPaper,
  questions: Question[],
  filename: string,
): Promise<void> {
  const map = new Map(questions.map((q) => [q.id, q]))
  const children: Array<Paragraph | Table> = [
    new Paragraph({
      text: paper.institutionName || 'Institution Name',
      heading: HeadingLevel.HEADING_1,
      alignment: 'center',
    }),
    new Paragraph({
      text: paper.examName || 'Examination',
      heading: HeadingLevel.HEADING_2,
      alignment: 'center',
    }),
    new Paragraph({
      text: `${paper.className}   |   ${paper.subject}   |   ${paper.time ?? ''}   |   Full Marks: ${paper.fullMarks}`,
      alignment: 'center',
    }),
  ]

  if (paper.instructions) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: paper.instructions })],
      }),
    )
  }

  for (let i = 0; i < paper.questionIds.length; i += 1) {
    const q = map.get(paper.questionIds[i])
    if (!q) continue

    children.push(qParagraph(q, i))

    if (q.options) {
      for (let j = 0; j < q.options.length; j += 1) {
        children.push(
          new Paragraph({
            text: `${String.fromCharCode(65 + j)}. ${q.options[j].text}`,
            bidirectional: q.direction === 'rtl',
          }),
        )
      }
    }

    if (q.subQuestions) {
      for (const sub of q.subQuestions) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${sub.label} `, bold: true }),
              new TextRun({ text: sub.text }),
              new TextRun({ text: ` [${sub.marks}]` }),
            ],
            bidirectional: q.direction === 'rtl',
          }),
        )
      }
    }

    if (q.media) {
      for (const media of q.media) {
        const image = await normalizeImage(media.dataUrl)
        children.push(
          new Paragraph({
            alignment:
              media.align === 'center'
                ? 'center'
                : media.align === 'right'
                  ? 'right'
                  : 'left',
            children: [
              new ImageRun({
                data: image.data,
                transformation: { width: 500, height: 300 },
                type: image.type,
              }),
            ],
          }),
        )
      }
    }

    if (q.table) {
      const tableRows = q.table.rows.map(
        (row) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      text: cell,
                      bidirectional: q.table?.direction === 'rtl',
                    }),
                  ],
                }),
            ),
          }),
      )
      children.push(new Table({ rows: tableRows }))
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children,
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.docx') ? filename : `${filename}.docx`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
