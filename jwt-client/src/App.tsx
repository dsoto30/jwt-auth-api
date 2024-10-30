import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

const theme = {
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
}

function App() {

  return <MantineProvider theme={theme}>
    <div>Hello World</div>
  </MantineProvider>
}

export default App
