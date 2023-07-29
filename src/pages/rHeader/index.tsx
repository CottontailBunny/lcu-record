import { appWindow } from "@tauri-apps/api/window";
import "./index.css";
export default function () {
	return (
		<div className='header-area'>
			<div className='flex gap-3'>
				<div
					className='minimize-icon'
					onClick={() => appWindow.minimize()}>
					-
				</div>
				<div className='close-icon' onClick={() => appWindow.close()}>
					x
				</div>
			</div>
		</div>
	);
}
