<?php
header('Access-Control-Allow-Origin: *');

$title = $_GET['title'];
$body = $_GET['body'];

$IMAGE_WIDTH = 1260;

$FONT_1 = './FavoritProLight.ttf';

$FONT_COLOR = [29,29,27];

function createTitle($title, $im) {
    global $IMAGE_WIDTH, $FONT_1, $FONT_COLOR;
    $character_height = 80;
    $character_width = 36;
    $multiline = wordwrap($title, 15, '\n');
    $multiline = explode('\n', $multiline);
    $y = $character_width + 50;
    
    foreach ($multiline as &$line) {
        $text_box = imagettfbbox(60, 0, $FONT_1, $line);

        imagettftext($im, 60, 0, ($IMAGE_WIDTH/2) - ($text_box[4]/2), $y,  
        imagecolorallocate($im, $FONT_COLOR[0], $FONT_COLOR[1], $FONT_COLOR[2]),
                    $FONT_1,
                    $line
        );        

        

        $y += $character_height;
    }

    return $y;
}

function createBody($body, $im, $_y) {
    global $IMAGE_WIDTH, $FONT_1, $FONT_COLOR;
    $character_height = 80;
    $character_width = 36;
    $multiline = wordwrap($body, 40, '\n');
    $multiline = explode('\n', $multiline);
    $y = $_y;
    
    foreach ($multiline as &$line) {
        $text_box = imagettfbbox(60, 0, $FONT_1, $line);

        
        imagettftext($im, 60, 0, ($IMAGE_WIDTH/2) - ($text_box[4]/2), $y,  
        imagecolorallocate($im, $FONT_COLOR[0], $FONT_COLOR[1], $FONT_COLOR[2]),
                    $FONT_1,
                    $line
        );        
        

        $y += $character_height;
    }

    return $y;
}

try{
    $image_width = $IMAGE_WIDTH;
    $image_height = 100;
    $im = imagecreatetruecolor($image_width, $image_height); 
    imagesavealpha($im, true);
    $color = imagecolorallocatealpha($im, 0, 0, 0, 127);
    imagefill($im, 0, 0, $color);

    $y = createTitle($title, $im);
    $y = createBody($body, $im, $y);
    
    
    header('Content-Type: image/png'); 
    imagepng($im); 
    imagedestroy($im); 
} catch (Error $error) {
    var_dump($error);
}
?>