import { createGlobalStyle } from 'styled-components';

const GlobalCSS = createGlobalStyle`
	* {
		margin: 0;
		font-family: 'Nunito', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	p {
		font-family: 'Nunito', sans-serif !important;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	/* Progress bar */
	#nprogress .bar {
		background: rgb(166, 255, 0) !important;
	}

	#nprogress .peg {
		box-shadow: 0 0 10px red, 0 0 5px red !important;
	}

	#nprogress .spinner-icon {
		border-top-color: red !important;
		border-left-color:rgb(255, 170, 101) !important;
	}
`;

export default GlobalCSS;
