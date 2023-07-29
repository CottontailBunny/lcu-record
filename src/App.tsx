import { ConfigProvider } from "antd";
import RecordBoard from "./pages/recordBoard";
import "./App.css";

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#6AAFE6 ",
				},
			}}>
			<div className='container'>
				<RecordBoard />
			</div>
		</ConfigProvider>
	);
}

export default App;
