<?php  //Start the Session
session_start();

require_once('config.php');
//3. If the form is submitted or not.
//3.1 If the form is submitted
if (isset($_POST['username']) and isset($_POST['password'])){
//3.1.1 Assigning posted values to variables.
$username = $_POST['username'];
$password = $_POST['password'];
	$mysqli = mysqli_init();
	$mysqli->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
	$mysqli->real_connect($config['db_host'],$config['db_user'],$config['db_password'],$config['db_name']);



//3.1.2 Checking the values are existing in the database or not
$query = "SELECT * FROM `reg_doctors` WHERE username='$username' and password='$password'";



$result = $mysqli->query($query);
$count = mysqli_num_rows($result);
//3.1.2 If the posted values are equal to the database values, then session will be created for the user.
if ($count == 1){
$_SESSION['username'] = $username;
	$_SESSION['doc'] = 1;
}else{
//3.1.3 If the login credentials doesn't match, he will be shown with an error message.
}
}
//3.1.4 if the user is logged in Greets the user with message
if (isset($_SESSION['username'])){
$username = $_SESSION['username'];

echo "<a href='logoutdoc.php'>Logout</a></br>";
	echo "<a href='addpatientz.php'>add patients</a>";

}
//3.2 When the user visits the page first time, simple login form will be displayed.
?>
	<div class="register-form">
		<?php
		if(isset($msg) & !empty($msg)){
			echo $msg;
		}
		?>
		<h1>Login</h1>
		<form action="" method="POST">
			<p><label>User Name : </label>
				<input id="username" type="text" name="username" placeholder="username" /></p>

			<p><label>Password&nbsp;&nbsp; : </label>
				<input id="password" type="password" name="password" placeholder="password" /></p>

			<a class="btn" href="register.php">Signup</a>
			<input class="btn register" type="submit" name="submit" value="Login" />
		</form>
	</div>
	<?php ?>