<!DOCTYPE html>
<!--[if lt IE 7]>      <html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html <?php language_attributes(); ?> class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php wp_title( '|', true, 'right' ); ?></title>

    <meta name="viewport" content="width=device-width,initial-scale=1,minimal-ui">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/style.css">
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">

    <script src="<?php echo get_template_directory_uri(); ?>/js/lib/modernizr.min.js"></script>

    <?php
    get_template_part('templates/head','icons');
    ?>

    <?php
    wp_head();
    ?>
    <script>
        var adminUrl = "<?php echo get_admin_url();?>",
            tplUrl = "<?php echo get_template_directory_uri();?>";
    </script>
    <!-- <script type="text/javascript" src="//use.typekit.net/ram7pgv.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script> -->
</head>

<body <?php body_class(['nav-collapsed']); ?>>