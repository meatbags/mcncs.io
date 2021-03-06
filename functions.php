<?php
function ajax_load(){
  header("Content-Type: text/html");

  $postCount = $_POST["postCount"];
  $offset = $_POST["offset"];
  $type = $_POST["type"];
  $query = new WP_Query(array(
    'suppress_filters' => true,
    'post_type' => $type,
    'posts_per_page' => $postCount,
    'order' => 'DESC',
    'orderby' => 'menu_order'
  ));

  echo 'RESULT';
  wp_reset_query();
  die();
}
add_action('wp_ajax_nopriv_ajax_load', 'ajax_load');
add_action('wp_ajax_ajax_load', 'ajax_load');

function xb_setup()
{
	add_theme_support('title-tag');
	add_theme_support('automatic-feed-links');
	add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'xb_setup');

function remove_admin_post_types() {
  remove_menu_page('edit.php');
  remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'remove_admin_post_types');

function add_admin_post_types() {
  remove_post_type_support('page', 'editor');
  /*
	register_post_type('Lineup', array(
		'label' => 'Lineup',
		'public' => true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug' => 'lineup'),
		'query_var' => true,
		'menu_icon' => 'dashicons-admin-users',
		'taxonomies' => array('category', 'post_tag'),
		'supports' => array('title', 'editor', 'revisions', 'thumbnail')
	));
  remove_post_type_support('lineup', 'editor');
  */
}
add_action('init', 'add_admin_post_types');

add_action( 'comment_form_before', 'xb_enqueue_comment_reply_script' );
function xb_enqueue_comment_reply_script()
{
	if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}

add_filter( 'the_title', 'xb_title' );
function xb_title( $title ) {
	if ( $title == '' ) {
		return '&rarr;';
	} else {
		return $title;
	}
}

add_filter( 'wp_title', 'xb_filter_wp_title' );
function xb_filter_wp_title( $title )
{
	return $title . esc_attr( get_bloginfo( 'name' ) );
}
function xb_custom_pings( $comment ){
	$GLOBALS['comment'] = $comment;
	?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
	<?php
}

function my_login_logo_one() {
?>
	<style type="text/css">
  body.login div#login h1 {
    width: 100%;
    height: 180px;
  }
  body.login div#login h1 a {
    width: 100%;
    height: 100%;
    background-image: url(<?php echo get_template_directory_uri() . '/lib/img/temp_logo.jpg'; ?>);
    background-size: 200px;
    display: flex;
  }
	</style>
<?php
} add_action( 'login_enqueue_scripts', 'my_login_logo_one' );

add_action( 'wp_enqueue_scripts', 'xb_load_scripts' );
function xb_load_scripts()
{
	// remove woo styles
	wp_enqueue_script('xbscript_jquery', get_stylesheet_directory_uri() . '/lib/build/jquery-3.2.1.min.js');
	wp_enqueue_script('xbscript_three', get_stylesheet_directory_uri() . '/lib/build/three.min.js');
	wp_enqueue_script('xbscript_app', get_stylesheet_directory_uri() . '/lib/build/app.min.js');
	wp_register_style('xbstyle', get_stylesheet_directory_uri() . '/lib/build/style.css' );
	wp_enqueue_style('xbstyle');
}
