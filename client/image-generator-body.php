<?php
error_reporting(E_ALL);



$title = $_GET['title'];
$body = $_GET['body'];

$IMAGE_WIDTH = 1260;

$FONT_1 = './FavoritProLight.ttf';
$FONT_2 = './PhaseGGX100.ttf';

$ALT_CHAR = "<>";

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
    global $IMAGE_WIDTH, $FONT_1, $FONT_2, $FONT_COLOR, $ALT_CHAR;
    $character_height = 80;
    $character_width = 36;
    $y = $_y;
    

    $words = explode(" ", $body);
    $addSpace = 0;

    $lineWords = [];
    $lineWidth = [];

    $lineY = 0;

    $currentWidth = 0;

    for ($i = 0; $i < count($words); $i++) {
        $word = $words[$i];

        $font = stristr($text, $ALT_CHAR) ? $FONT_2 : $FONT_1;
        $wordWidth = getWordWidth($word, $font, 60);

        if ($currentWidth + $wordWidth > $IMAGE_WIDTH - 100) {
            $lineWidth[$lineY] = $currentWidth;
            $lineY++;
            $currentWidth = 0;
        } 

        $currentWidth += $wordWidth;

        if (!array_key_exists($lineY, $lineWords)) {
            $lineWords[$lineY] = [];
        }

        array_push($lineWords[$lineY], $word);

    }

    for ($i = 0; $i < count($lineWords); $i++) {
        $line = $lineWords[$i];
        $lineSpace = implode("| |", $line);
        $lineSpace = explode("|", $lineSpace);

        $finalTotalWidth = 0;
        
        for ($j = 0; $j < count($lineSpace); $j++) {
            $w = $lineSpace[$j];
            $font = stristr($w, $ALT_CHAR) ? $FONT_2 : $FONT_1;
            $finalTotalWidth += getWordWidth($w, $font, 60);
        }

        $x = $IMAGE_WIDTH / 2 - $finalTotalWidth / 2;

        for ($j = 0; $j < count($lineSpace); $j++) {
            $w = $lineSpace[$j];
            $font = stristr($w, $ALT_CHAR) ? $FONT_2 : $FONT_1;
            $ww = getWordWidth($w, $font, 60);
            getWord($w, $x, $y + ($i * 75), $im);
            $x += $ww;
        }
    }

    

    return $y;
}

function getWord($text, $x, $y, $im) {
    global $IMAGE_WIDTH, $FONT_1, $FONT_2, $FONT_COLOR, $ALT_CHAR;

    if (stristr($text, $ALT_CHAR)){
        $font = $FONT_2;
        return imagettftext($im, 60, 0, $x, $y, imagecolorallocate($im, $FONT_COLOR[0], $FONT_COLOR[1], $FONT_COLOR[2]), $font, str_replace($ALT_CHAR, "", $text));
    }
    else
    {
        $font = $FONT_1;
        return imagettftext($im, 60, 0, $x, $y, imagecolorallocate($im, $FONT_COLOR[0], $FONT_COLOR[1], $FONT_COLOR[2]), $font, $text);
    }
}

function getWordWidth($text, $font, $size) {
    global $ALT_CHAR;
    $box = imagettfbbox($size, 0, $font, str_replace($ALT_CHAR, "", $text));
    return $box[4];
}

try{
    $image_width = $IMAGE_WIDTH;
    $image_height = 500;
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