<?php
$permalink = get_permalink( $post->ID );
$featured_img = rwmb_meta( 'jsp_featured', 'type=plupload_image', $post->ID );

?>
                        <li class="col-xs-6 col-sm-4 item-wrap <?php echo 'news-'.$post->ID?>">
                            <div class="item">
                                <figure>
                                    <a href="" class="manual-modal" data-target="#SiteModal" data-modal-type="mtype-news" data-remote="<?php link_to_plain($post->ID); ?>"  data-pid="<?php echo $post->ID?>">
                                        <img class="deferred" src="<?php echo get_template_directory_uri(); ?>/img/ib_.png" alt="<?php echo $post->post_title ?>" data-deferred-img="<?php jsp_the_post_thumbnail('thumb-400')?>">
                                    </a>
                                </figure>
                                <time datetime="<?php echo jsp_get_the_date(); ?>"><?php echo jsp_get_the_date(); ?></time>
                                <a href="" class="manual-modal" data-target="#SiteModal" data-modal-type="mtype-news" data-remote="<?php link_to_plain($post->ID); ?>" data-pid="<?php echo $post->ID?>">
                                    <h2><?php echo $post->post_title ?></h2>
                                </a>
                            </div>
                        </li>