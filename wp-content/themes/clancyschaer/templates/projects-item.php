<?php
$permalink = get_permalink( $post->ID );
$featured_img = rwmb_meta( 'jsp_featured', 'type=plupload_image', $post->ID );

?>
                        <li class="item col-xs-6 col-md-4 <?php echo 'projects-'.$post->ID?>">
                            <a href="" class="manual-modal" data-target="#SiteModal" data-modal-type="mtype-project" data-remote="<?php link_to_plain($post->ID); ?>"  data-pid="<?php echo $post->ID?>">
                                <div class="item-container">
                                    <div class="overlay">
                                        <h2><?php echo $post->post_title ?></h2>
                                        <span>View Project</span>
                                    </div>
                                    <img src="<?php echo get_template_directory_uri(); ?>/img/ib_.png" class="deferred" data-deferred-img="<?php jsp_the_post_thumbnail('thumb-400')?>" alt="<?php echo $post->post_title ?>">
                                </div>
                            </a>
                        </li>