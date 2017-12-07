<!DOCTYPE html>
<!--

	website by xavier-burrow.com

-->
<html lang="en">
<head>
	<title><?php bloginfo('name'); ?></title>
	<meta name="description" content="<?php bloginfo(); ?>">
	<meta charset="utf-8" />
	<meta property="og:url" content="http://www.mcncs.io" />
	<meta property="og:title" content="Mechanics"/>
	<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/screenshot.jpg"/>
	<meta property="og:site_name" content="Mechanics"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
	<link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
	<?php wp_head(); ?>
	<script>
		/* <![CDATA[ */
		var themePath = '<?php echo get_template_directory_uri(); ?>';
		var pageTitle = '<?php echo get_the_title(); ?>';
		var isHome = '<?php echo is_home(); ?>';
		var ajaxUrl = '<?php echo admin_url('admin-ajax.php'); ?>';
		/* ]]> */
	</script>
</head>

<?php
	get_template_part('nav');
	get_template_part('canvas');
	get_template_part('loading');
?>

<body class="<?php echo join(' ', get_body_class(''));?>">
<div class="content">
	<div class="wrapper">
		<?php get_template_part('nav'); ?>
