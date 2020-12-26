<?php
header('Access-Control-Allow-Origin: *');

$text_1 = $_GET['text_1'];
$text_2 = $_GET['text_2'];

$IMAGE_WIDTH = 500;

$FONT_1 = './FavoritProLight.ttf';
$FONT_2 = './PhaseGGX100.ttf';

$FONT_COLOR = [29,29,27];

try{
    $text_1_box = imagettfbbox(60, 0, $FONT_1, $text_1);
    $text_2_box = imagettfbbox(60, 0, $FONT_2, $text_2);

    $image_width = $text_1_box[4] + $text_2_box[4] + 50;

    $image_height = 70;
    $im = imagecreatetruecolor($image_width, $image_height); 
    imagesavealpha($im, true);
    $color = imagecolorallocatealpha($im, 0, 0, 0, 127);
    imagefill($im, 0, 0, $color);

    imagettftext($im, 60, 0, 0, 55, 
        imagecolorallocate($im, $FONT_COLOR[0], $FONT_COLOR[1], $FONT_COLOR[2]),
        $FONT_1,
        $text_1
    );        

    imagettftext($im, 60, 0, $text_1_box[4] + 20, 55, 
        imagecolorallocate($im, $FONT_COLOR[0], $FONT_COLOR[1], $FONT_COLOR[2]),
        $FONT_2,
        $text_2
    );        
    
    header('Content-Type: image/png'); 
    imagepng($im); 
    imagedestroy($im); 
} catch (Error $error) {
    var_dump($error);
}
?>