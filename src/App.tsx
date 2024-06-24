//import { FC } from "react";

import { useEffect } from "react";
import { getRandomUsers } from "./API/RandomUser";

// way 1- Declare types using interface (most popular way)
/*interface Props {
  title: string;
}*/

// way 2- Declare types using type keyword
type Props = {
  title: string;
}

/**
 * FC - react use FC to define function component, always implicitly include children in the props
 * sometimes, you don't need to pass children, so that time this can be unwanted rendering
 * @returns 
 */

//const App: FC<Props> = () => {
//const App = (props: Props) => {
// way 3 - Declare types using inline declaration
const App = ({ title }: { title: string }) => {

  useEffect(() => {
    getRandomUsers();
  });

  return (
    <h1>Test App - {title}</h1>
  )
}

export default App;
