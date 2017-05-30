<?php
    setup_postdata($post);

    $pid = $post->ID;
    $cat = get_the_category();
    $current_cat_id = $cat[0]->term_id;

    $args = array(
        'posts_per_page' => -1,
        'category' => $current_cat_id
    );
    $posts = get_posts($args);

    $ids = array();
    foreach ($posts as $thepost) {
        $ids[] = $thepost->ID;
    }

    $idx = array_search($post->ID, $ids);
    $nextid = $ids[$idx-1];
    $previd = $ids[$idx+1];
    $position = $idx + 1;

    $caseStudy = rwmb_meta( 'jsp_caseStudy', '', $post->ID );

    //add_filter('the_content', 'add_deferred_img', 11);
?>
<?php if ( in_category(['news']) ) { ?>
        <article class="item<?php echo ($previd)? ' has-older': null; ?><?php echo ($nextid)? ' has-newer': null; ?><?php echo ' pid-'.$post->ID; ?>" pids="<?=json_encode($ids)?>" data-older-pid="<?=$previd?>" data-newer-pid="<?=$nextid?>" data-cat-position="<?=$position?>" data-cat-count="<?=count($ids)?>">
            <div class="item-wrapper">
                <div class="content">
                    <figure class="article-photo">
                        <div class="share-drawer">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="200px" height="200px" viewBox="0 0 200 200" enable-background="new 0 0 200 200" xml:space="preserve" class="drawer-icon"><polygon points="184,130 184,184 16,184 16,16 70,16 70,0 0,0 0,200 200,200 200,130" class="style0"/><polygon points="130,0 130,16 172.7,16 86,102.7 97.3,114 184,27.3 184,70 200,70 200,0" class="style0"></svg>
                            <?php get_template_part( 'templates/sns', 'share' ); ?>
                        </div>
                        <?php if ($isTablet || $isMobile) {?>
                        <img src="<?php jsp_the_post_thumbnail('tablet-thumb')?>" alt="">
                        <?php } else {?>
                        <img src="<?php jsp_the_post_thumbnail()?>" alt="">
                        <?php }?>

                    </figure>
                    <h2><?php the_title();?></h2>
                    <time datetime="<?php echo jsp_get_the_date(); ?>"><?php echo jsp_get_the_date(); ?></time>
                    <?php the_content(); ?>
                    <?php if ($caseStudy) { ?>
                    <a href="" class="manual-modal link-project" data-target="#SiteModal" data-modal-type="mtype-project" data-remote="<?php link_to_plain($caseStudy); ?>"  data-pid="<?php echo $caseStudy?>">
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

<?php } elseif (  in_category(['projects'])) { ?>
        <article class="item<?php echo ($previd)? ' has-older': null; ?><?php echo ($nextid)? ' has-newer': null; ?><?php echo ' pid-'.$post->ID; ?>" pids="<?=json_encode($ids)?>" data-older-pid="<?=$previd?>" data-newer-pid="<?=$nextid?>" data-cat-position="<?=$position?>" data-cat-count="<?=count($ids)?>">
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
                    <?php
                    $html_content = get_post_meta( $pid, '_ig_html_content', true );
                    if ( $html_content != null ) {
                        echo $html_content;
                    } else {
                        the_content();
                    }
                    ?>

                </div>
                <footer class="connect-nav">
                    <span class="title">CONNECT:</span>
                    <ul class="list-unstyled list-inline sns-networks">
                        <?php get_template_part('templates/sns','links');?>
                    </ul>
                </footer>
            </div>
        </article>

<?php } else { ?>

    <div id="queryContainer">


        <?php the_title()?>
        <?php the_content()?>

    </div>
<?php } ?>

<?php
    wp_reset_postdata();
?>