//import { FC } from "react";

// Declare types using interface (most popular way)
/*interface Props {
  title: string;
}*/

// Declare types using type keyword
type Props = {
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
    <div>Test App - {props.title}</div>
  )
}

export default App;
