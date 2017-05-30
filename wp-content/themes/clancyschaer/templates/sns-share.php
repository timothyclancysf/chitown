                            <?php
                                $sns_text = urlencode( html_entity_decode( get_the_title() ) );
                                $tw_user = 'ClancySchaer';
                                $perma = get_the_permalink($pid);

                                ob_start();
                                jsp_the_post_thumbnail('square');
                                $thumbpic = ob_get_contents();
                                ob_end_clean();
                            ?>

                            <div class="sns-block">
                            <!--<?php echo $thumbpic ?>-->
                                <a href="//www.facebook.com/sharer.php?s=100&p[title]=<?php echo $sns_text; ?>&p[summary]=<?php echo strip_tags(get_the_excerpt()); ?>&p[url]=<?php echo $perma ?>&p[images][0]=<?php echo $thumbpic ?>" data-jsp="popup">
                                    <i class="icon icon-facebook"></i>
                                </a>

                                <a href="//www.linkedin.com/shareArticle?url=<?php echo $perma ?>&mini=true" data-jsp="popup">
                                    <i class="icon icon-linkedin"></i>
                                </a>

                                <a href="//twitter.com/intent/tweet?url=<?php echo $perma ?>&via=<?php echo $tw_user; ?>&text=<?php echo $sns_text; ?>"  data-jsp="popup">
                                    <i class="icon icon-twitter"></i>
                                </a>

                                <a href="//plus.google.com/share?url=<?php echo $perma ?>" data-jsp="popup">
                                    <i class="icon icon-gplus"></i>
                                </a>

                                <a href="//pinterest.com/pin/create/button/?url=<?php echo $perma ?>&media=<?php echo $thumbpic ?>&description=<?php echo $sns_text; ?>" data-jsp="popup">
                                    <i class="icon icon-pinterest"></i>
                                </a>
                            </div>