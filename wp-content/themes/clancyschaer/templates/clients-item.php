<?php
$permalink = get_permalink( $post->ID );
$featured_img = rwmb_meta( 'jsp_featured', 'type=plupload_image', $post->ID );
$caseStudy = rwmb_meta( 'jsp_caseStudy', '', $post->ID );

?>
                        <li class="col-xs-6 col-sm-3 item-wrap <?php echo 'clients-'.$post->ID?>">
                            <div class="item">
                                <?php if ($caseStudy) {  ?>
                                <a href="" class="manual-modal" data-target="#SiteModal" data-modal-type="mtype-project" data-remote="<?php link_to_plain($caseStudy); ?>"  data-pid="<?php echo $caseStudy?>">
                                <?php }?>
                                    <img src="<?php echo get_template_directory_uri(); ?>/img/ib_.png" class="deferred" alt="<?php echo $post->post_title ?>" title="<?php echo $post->post_title ?>" data-deferred-img="<?php jsp_the_post_thumbnail('medium')?>">
                                <?php if ($caseStudy) {?>
                                </a>
                                <?php }?>
                            </div>
                        </li>