<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="library/css/bootstrap.css">
    <script type="text/javascript" src="library/js/jquery-1.11.3.min.js"></script>
    <?php
        session_start();
        $username = $_SESSION['username'];
    ?>
    <script>
        $('#logout').click(function(){
            alert("dsad");
           window.location.href = "index.php";
        });
    </script>
</head>
<body style="background-color: #ecf0f1">
<div style="background-color: #34495e">
    <div class="navbar-header">
        <a class="navbar-brand" href="#" style="color: #ffffff">Mobile Emergency Patient Monitoring System</a>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul id="logout" class="nav navbar-nav navbar-right" style="margin-top: 10px; margin-right: 10px">
            <li >
                <button class="btn btn-primary btn-sm" type="button"> Logout </button>
            </li>
        </ul>
    </div>
</div>


</body>
</html>