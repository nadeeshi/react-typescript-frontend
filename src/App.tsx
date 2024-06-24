//import { FC } from "react";

interface Props {
  title: string;
}

/**
 * FC - react use FC to define function component, always implicitly include children in the props
 * sometimes, you don't need to pass children, so that time this can be unwanted rendering
 * @returns 
 */

//const App: FC<Props> = () => {
const App = (props: Props) => {
  
  return (
    <div>Test App</div>
  )
}

export default App;
