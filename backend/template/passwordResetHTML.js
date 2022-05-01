const passwordResetHTML = (password) => {
  return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title></title>
	</head>
	<body style="background-color: rgb(255, 250, 244);width: 600px;font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;display: flex;justify-content: center;">
		<main style="display: flex;justify-content: center;align-items: center;width: 600px;">
			<div style="background-color: white;text-align: center;min-height: 30vh; min-width: 30vw;width:600px">
				<h1>Forgot your password?</h1>
				<p style="margin-bottom: 1.2em;">You can use the provided temporary password to login.</p>
				<div style="height: 4em;" class="center">
					<p style="background-color: coral;padding: 1.5em;border-radius: 25px;border: none;color:white;font-size: 1em;margin: 2em;">
						<b>
							${password}
						</b>
					</p>
				</div>
				<div style="background-color: rgb(0, 0, 0);min-height: 5vh;color: white;width: 100%;margin-top: 4em;text-align: center;height: 100%;">
						<small>Copyright Rexlan © 2022</small> <br/>
				</div>
			</div>
		</main>
	</body>
	</html>
	`;
};

module.exports = passwordResetHTML;
