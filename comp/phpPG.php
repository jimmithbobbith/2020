<?php
define('WP_USE_THEMES', false);
require('c/wp-blog-header.php');

query_posts(array(
    'posts_per_page'	=> -1,
    'meta_key'			=> 'order',
    'orderby'			=> 'meta_value_num',
    'order'				=> 'ASC'
));

$jsonpost = array();$listel = "";
$i = 0;



if (have_posts()) {
    while (have_posts()) {
        the_post();
        $jsonpost[$i]["id2"] = get_the_ID();
        $jsonpost[$i]["title"] = get_the_title();
        $jsonpost[$i]["titleen"] = get_post_meta($jsonpost[$i]["id2"], 'title_en', true);
        $jsonpost[$i]["subheader"] = get_post_meta($jsonpost[$i]["id2"], 'subheader_en', true);
        $jsonpost[$i]["paragraph1"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_1_en', true);
        $jsonpost[$i]["paragraph2"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_2_en', true);
        $jsonpost[$i]["videofile"] = get_post_meta($jsonpost[$i]["id2"], 'videofile', true);

               $jsonpost[$i]["titlenl"] = get_post_meta($jsonpost[$i]["id2"], 'title_nl', true);
        $jsonpost[$i]["subheadernl"] = get_post_meta($jsonpost[$i]["id2"], 'subheader_nl', true);
        $jsonpost[$i]["paragraph1nl"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_1_nl', true);
        $jsonpost[$i]["paragraph2nl"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_2_nl', true);

        $jsonpost[$i]["titlePO"] = get_post_meta($jsonpost[$i]["id2"], 'title_po', true);
        $jsonpost[$i]["subheaderPO"] = get_post_meta($jsonpost[$i]["id2"], 'subheader_po', true);
        $jsonpost[$i]["paragraph1PO"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_1_po', true);
        $jsonpost[$i]["paragraph2PO"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_2_po', true);
        $jsonpost[$i]["lang_title"]=array();
$jsonpost[$i]["lang_subheader"]=array();
$jsonpost[$i]["lang_paragraph1"]=array();
$jsonpost[$i]["lang_paragraph2"]=array();
        $jsonpost[$i]["lang_title"]["en"] = get_post_meta($jsonpost[$i]["id2"], 'title_en', true);
        $jsonpost[$i]["lang_subheader"]["en"] = get_post_meta($jsonpost[$i]["id2"], 'subheader_en', true);
        $jsonpost[$i]["lang_paragraph1"]["en"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_1_en', true);
        $jsonpost[$i]["lang_paragraph2"]["en"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_2_en', true);

        $jsonpost[$i]["lang_title"]["po"] = get_post_meta($jsonpost[$i]["id2"], 'title_po', true);
        $jsonpost[$i]["lang_subheader"]["po"] = get_post_meta($jsonpost[$i]["id2"], 'subheader_po', true);
        $jsonpost[$i]["lang_paragraph1"]["po"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_1_po', true);
        $jsonpost[$i]["lang_paragraph2"]["po"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_2_po', true);

        $jsonpost[$i]["lang_title"]["nl"] = get_post_meta($jsonpost[$i]["id2"], 'title_nl', true);
        $jsonpost[$i]["lang_subheader"]["nl"] = get_post_meta($jsonpost[$i]["id2"], 'subheader_nl', true);
        $jsonpost[$i]["lang_paragraph1"]["nl"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_1_nl', true);
        $jsonpost[$i]["lang_paragraph2"]["nl"] = get_post_meta($jsonpost[$i]["id2"], 'paragraph_2_nl', true);


        $jsonpost[$i]["order"] = get_post_meta($jsonpost[$i]["id2"], 'order', true);
     $i++;
    }}


echo "<script>
    console.log( 'pgs[2].order:');

var pgUnsorted = ", json_encode($jsonpost), ";";
echo "function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    pgs = sortByKey(pgUnsorted, 'order');
 console.log( pgs[3]);
</script>";

?>
