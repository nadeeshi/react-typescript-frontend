import { FC } from "react";

interface Props {
  title: string;
}

/**
 * FC - react use FC to define function component, always implicitly include children in the props
 * 
 * @returns 
 */
const App: FC<Props> = () => {
  
  return (
    <div>Test App</div>
  )
}

export default App;
