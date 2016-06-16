<?php
define('WP_USE_THEMES', false);
require('c/wp-blog-header.php');
query_posts(array(
    'posts_per_page'	=> -1,
    'meta_key'			=> 'order',
    'orderby'			=> 'meta_value_num',
    'order'				=> 'ASC'
));
$jsonpost = array();
$i = 0;

echo '<section class="main">
<video id="video" class ="st-item st-center" autoplay  style="width:50vw"  >
    <source src="videos/welkom.mp4" type="video/mp4">
<!--    <source src="movie.ogg" type="video/ogg">-->
    Your browser does not support the video tag.
</video>
    <ul id="st-stack" class="st-stack-raw">';
$i=0;



$jsonposs = array();
if (have_posts()) {
    while (have_posts()) {
        the_post();
        $jsonposs[$i]["id2"] = get_the_ID();
        $temp = get_post_meta($jsonposs[$i]["id2"], 'videofile', true);

        echo ' <li><div class="st-item"><img id="img'.$i.'" src="videos/'.$temp.'.jpg"/></a></div><div class="st-title"><h2>'.get_the_title().'</h2></div></li>';

        $i++;

    }}


echo "
    </ul>
</section>
";

?>
