import { Component, type ErrorInfo, type ReactNode } from 'react'
interface Props{children:ReactNode}
interface State{hasError:boolean}
export class ErrorBoundary extends Component<Props,State>{
 state:State={hasError:false}
 static getDerivedStateFromError():State{return {hasError:true}}
 componentDidCatch(error:Error,info:ErrorInfo){console.error('Question Builder runtime error',error,info)}
 render(){if(this.state.hasError)return <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-slate-950"><section className="w-full max-w-md rounded-2xl border bg-white p-6 text-center"><h1 className="text-xl font-bold">Something went wrong</h1><p className="mt-2 text-sm text-slate-500">The application could not render this screen. Your saved LocalStorage data was not intentionally deleted.</p><button onClick={()=>window.location.reload()} className="mt-5 min-h-11 rounded-xl bg-slate-950 px-5 text-sm font-medium text-white">Reload application</button></section></main>;return this.props.children}
}