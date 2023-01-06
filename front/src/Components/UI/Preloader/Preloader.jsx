import { useEffect } from 'react';
import Styles from './Preloader.module.scss';

const Preloader = ({stateApp, setStateApp}) => {
	function pageListener() {
		let copy = Object.assign([], stateApp);
		copy.preloader.isLoadPage = true;
		setStateApp(copy);
	}
	window.addEventListener('load', pageListener);

	useEffect(() => {
		window.removeEventListener('load', pageListener);
	});

	let isHidden = stateApp.preloader.isLoadPage && !stateApp.preloader.isFetch? ` ${Styles.hidden}` : '';

	return (
		<div className={Styles.loader + isHidden}>
			<div className={Styles.loader__wrapper}></div>
		</div>
	);
};

export default Preloader;