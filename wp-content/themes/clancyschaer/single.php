<?php
get_header();
?>
    <div class="container">

            <?php
                setup_postdata($post);
                $older_post = get_previous_post(true);
                $newer_post = get_next_post(true);
                $catObj = get_the_category();
                $catIDs = get_posts( array(
                    'posts_per_page' => -1,
                    'category' => $catObj[0]->term_id,
                    'fields' => 'ids'
                ));
                $position = array_search($post->ID, $catIDs) + 1;
                $caseStudy = rwmb_meta( 'jsp_caseStudy', '', $post->ID );
            ?>
            <?php if ( in_category(['news']) ) { ?>
            <div class="mtype-news single-page">
                <div class="modal-header">
                    <a href="<?php echo site_url(); ?>/#!/News"class="modal-close text-hide">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" class="close-svg">
                            <polygon points="26.482,25.486 25.996,25 26.482,24.514 26.482,24.514 45,5.996 44.004,5 25.486,23.518    25.486,23.518 25,24.004 5.996,5 5,5.996 24.004,25 5,44.004 5.996,45 25,25.996 28.058,29.054 28.058,29.054 44.004,45 45,44.004    26.482,25.485 " class="svg-path">
                        </svg>
                    </a>
                </div>
                <article class="item<?php echo ($older_post)? ' has-older': null; ?><?php echo ($newer_post)? ' has-newer': null; ?><?php echo ' pid-'.$post->ID; ?>" data-older-pid="<?php echo ($older_post)? $older_post->ID : null; ?>" data-newer-pid="<?php echo ($newer_post)? $newer_post->ID : null; ?>" data-cat-position="<?php echo $position; ?>" data-cat-count="<?php echo count($catIDs) ?>">
                    <div class="item-wrapper">
                        <div class="content">
                            <figure class="article-photo">
                                <div class="share-drawer">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" class="drawer-icon"><polygon points="184,130 184,184 16,184 16,16 70,16 70,0 0,0 0,200 200,200 200,130" class="style0"/><polygon points="130,0 130,16 172.7,16 86,102.7 97.3,114 184,27.3 184,70 200,70 200,0" class="style0"></svg>
                                    <?php get_template_part( 'templates/sns', 'share' ); ?>
                                </div>
                                <img src="<?php jsp_the_post_thumbnail()?>" alt="">
                            </figure>
                            <h2><?php the_title();?></h2>
                            <time datetime="<?php echo jsp_get_the_date(); ?>"><?php echo jsp_get_the_date(); ?></time>
                            <?php the_content(); ?>
                            <?php if ($caseStudy) { ?>
                            <a href="/?p=<?php echo $caseStudy?>" class="manual-modal link-project" data-target="#SiteModal" data-modal-type="mtype-project" data-remote="<?php link_to_plain($caseStudy); ?>"  data-pid="<?php echo $caseStudy?>">
                            View work
                            </a>
                            <?php } ?>
                        </div>
                        <footer class="connect-nav">
                            <span class="title">CONNECT:</span>
                            <ul class="list-unstyled list-inline sns-networks">
                                <?php get_template_part('templates/sns','links');?>
                            </ul>
                        </footer>

                    </div>
                </article>
            </div>
            <?php } elseif (  in_category(['projects'])) { ?>

            <div class="mtype-project single-page">
                <div class="modal-header">
                    <a href="<?php echo site_url(); ?>/#!/Projects"class="modal-close text-hide">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" class="close-svg">
                            <polygon points="26.482,25.486 25.996,25 26.482,24.514 26.482,24.514 45,5.996 44.004,5 25.486,23.518    25.486,23.518 25,24.004 5.996,5 5,5.996 24.004,25 5,44.004 5.996,45 25,25.996 28.058,29.054 28.058,29.054 44.004,45 45,44.004    26.482,25.485 " class="svg-path">
                        </svg>
                    </a>
                </div>
                <article class="item<?php echo ($older_post)? ' has-older': null; ?><?php echo ($newer_post)? ' has-newer': null; ?><?php echo ' pid-'.$post->ID; ?>" data-older-pid="<?php echo ($older_post)? $older_post->ID : null; ?>" data-newer-pid="<?php echo ($newer_post)? $newer_post->ID : null; ?>" data-cat-position="<?php echo $position; ?>" data-cat-count="<?php echo count($catIDs) ?>">
                    <div class="item-wrapper">

                        <header class="project-header clearfix">
                            <div class="client-name">
                                <div class="item-label">Client</div>
                                <h2><?php the_title();?></h2>
                            </div>
                            <div class="project-type">
                                <div class="item-label">Project</div>
                                <h3><?php
                                $posttags = get_the_tags();

                                if ($posttags) {
                                    $tags = array();
                                    foreach($posttags as $tag) {
                                        array_push($tags,$tag->name);
                                    }
                                    echo implode(', ',$tags);
                                }
                                ?>
                                </h3>
                            </div>
                            <div class="share-drawer">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" class="drawer-icon"><polygon points="184,130 184,184 16,184 16,16 70,16 70,0 0,0 0,200 200,200 200,130" class="style0"/><polygon points="130,0 130,16 172.7,16 86,102.7 97.3,114 184,27.3 184,70 200,70 200,0" class="style0"></svg>
                                <?php get_template_part( 'templates/sns', 'share' ); ?>
                            </div>
                        </header>
                        <div class="content">
                            <?php the_content();?>

                        </div>
                        <footer class="connect-nav">
                            <span class="title">CONNECT:</span>
                            <ul class="list-unstyled list-inline sns-networks">
                                <?php get_template_part('templates/sns','links');?>
                            </ul>
                        </footer>
                    </div>
                </article>
            </div>
            <?php } else { ?>

                <div id="queryContainer">


                    <?php the_title()?>
                    <?php the_content()?>

                </div>
            <?php } ?>

            <?php
                wp_reset_postdata();
            ?>
    </div>
<?php
get_footer();
?>