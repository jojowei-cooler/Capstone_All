<!DOCTYPE html>
<html>

<head>
	<title>
		vote
	</title>
	<link rel="stylesheet" href="../homestyle.css" type="text/css" />
  <?php
    $page = $_SERVER['PHP_SELF'];
    $sec = "1";
    $car1file = "car1.txt";
    $car1 = file_get_contents($car1file);
		$car2file = "car2.txt";
    $car2 = file_get_contents($car2file);
		$heart1file = "heart1.txt";
    $heart1 = file_get_contents($heart1file);
		$heart2file = "heart2.txt";
    $heart2 = file_get_contents($heart2file);
		$flower1file = "flower1.txt";
    $flower1 = file_get_contents($flower1file);
		$flower2file = "flower2.txt";
    $flower2 = file_get_contents($flower2file);
		if(array_key_exists('carbutton1', $_POST)) {
      if ($car1 == null)
         $car1 = 0;
      else {
        $car1++;
      }
		}
		else if(array_key_exists('trash1', $_POST)) {
			$car1 = 0;
			$heart1 = 0;
			$flower1 = 0;
		}
		else if(array_key_exists('carbutton2', $_POST)) {
			if ($car2 == null)
         $car2 = 0;
      else {
        $car2++;
      }
		}
		else if(array_key_exists('trash2', $_POST)) { heart:
			$car2 = 0;
			$heart2 = 0;
			$flower2 = 0;
		}
		else if(array_key_exists('heartbutton1', $_POST)) {
			if ($heart1 == null)
         $heart1 = 0;
      else {
        $heart1++;
      }
		}
		else if(array_key_exists('heartbutton2', $_POST)) {
			if ($heart2 == null)
         $heart2 = 0;
      else {
        $heart2++;
      }
		}
		else if(array_key_exists('flowerbutton1', $_POST)) {
			if ($flower1 == null)
         $flower1 = 0;
      else {
        $flower1++;
      }
		}
		else if(array_key_exists('flowerbutton2', $_POST)) {
			if ($flower2 == null)
         $flower2 = 0;
      else {
        $flower2++;
      }
		}

    // echo "<h3>car:$car heart:$car</h3>";
		// echo "<h3 style>car:$car heart:$car</h3>";
    $handle = fopen($car1file, "w+");
    fwrite($handle, $car1);
    fclose($handle);
		$handle = fopen($car2file, "w+");
    fwrite($handle, $car2);
    fclose($handle);
		$handle = fopen($heart2file, "w+");
    fwrite($handle, $heart2);
    fclose($handle);
		$handle = fopen($heart1file, "w+");
    fwrite($handle, $heart1);
    fclose($handle);
		$handle = fopen($flower2file, "w+");
    fwrite($handle, $flower2);
    fclose($handle);
		$handle = fopen($flower1file, "w+");
    fwrite($handle, $flower1);
    fclose($handle);

  ?>

  <meta http-equiv="refresh" content="<?php echo $sec?>;URL='<?php echo $page?>'">
  <script type="text/JavaScript">
    function timedRefresh(timeoutPeriod) {
    	setTimeout("location.reload(true);",timeoutPeriod);
    }
  </script>
</head>

<body>

	<div class="" style=" width:50%; height:100%;float:left;">
		<!-- <h3>car:10</h3> -->
		<?php echo "<h3>Liver1</h3>"; ?>
		<?php echo "<h3>car:$car1 heart:$heart1 flower:$flower1</h3>"; ?>
			<form method="post">
			<!-- <input type="submit" name="carbutton1" alt="Submit" width="60px" height="60px"
					class="button" value="vote" style="background: url("car.png");"> -->
			<button type="submit" name="carbutton1">
				<img src="./car.png" height="40px" width="40px">
			</button>
			<!-- <input type="submit" name="heartbutton1"  alt="Submit" width="60px" height="60px"
					class="button" value="clear" style="background: url("heart.png");"> -->
			<button type="submit" name="heartbutton1">
				<img src="./heart.png" height="40px" width="40px">
			</button>
			<button type="submit" name="flowerbutton1">
				<img src="./flower.png" height="40px" width="40px">
			</button>
			<button type="submit" name="trash1">
				<img src="./trash.png" height="40px" width="40px">
			</button>
		</form>
	</div>
	<div class="" style="width:50%; height:100%;float:right;">
		<?php echo "<h3>Liver2</h3>"; ?>
		<?php echo "<h3>car:$car2 heart:$heart2 flower:$flower2</h3>"; ?>
		<form method="post">
			<button type="submit" name="carbutton2">
				<img src="./car.png" height="40px" width="40px">
			</button>
			<button type="submit" name="heartbutton2">
				<img src="./heart.png" height="40px" width="40px">
			</button>
			<button type="submit" name="flowerbutton2">
				<img src="./flower.png" height="40px" width="40px">
			</button>
			<button type="submit" name="trash2">
				<img src="./trash.png" height="40px" width="40px">
			</button>
		</form>
	</div>


</body>
</html>
