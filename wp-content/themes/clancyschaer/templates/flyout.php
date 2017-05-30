        <?php
        $home = get_page_by_path('home', OBJECT, 'page');
        $homeVid = rwmb_meta( 'jsp_backgroundVid', 'type=file', $home->ID );
        $homeVidImgArr = rwmb_meta( 'jsp_backgroundVidPreload', 'type=image', $home->ID );
        $homeVidImg = array_values($homeVidImgArr);

        if(array_filter($homeVid)){
            $bgDeskRaw = rwmb_meta( 'jsp_backgroundImg_tab', 'type=image', $home->ID );
        }else{
            $bgDeskRaw = rwmb_meta( 'jsp_backgroundImg', 'type=image', $home->ID );
        }

        $bgDesk = array_values($bgDeskRaw);

        $bgTabRaw = rwmb_meta( 'jsp_backgroundImg_tab', 'type=image&size=tablet', $home->ID );
        $bgTab = array_values($bgTabRaw);
        $bgTabpRaw = rwmb_meta( 'jsp_backgroundImg_tab_p', 'type=image&size=tablet', $home->ID );
        $bgTabp = array_values($bgTabpRaw);

        $bgMobRaw = rwmb_meta( 'jsp_backgroundImg_phone', 'type=image&size=phone', $home->ID );
        $bgMob = array_values($bgMobRaw);
        $bgMobpRaw = rwmb_meta( 'jsp_backgroundImg_phone_p', 'type=image&size=phone', $home->ID );
        $bgMobp = array_values($bgMobpRaw);

        if ($isTablet) {
            $bg = $bgTab[0]['full_url'] ?: $bgDesk[0]['full_url'];
        } else if ($isMobile) {
            $bg = $bgMob[0]['full_url'] ?: $bgDesk[0]['full_url'];
        } else {
            $bg = $bgDesk[0]['full_url'];
        }

        ?>
        <div class="flyout">
            <div class="peel">
                <div id="peel-open-label">
                    <span>C</span><span>S</span>
                </div>
                <div id="peel-close-label">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" class="close-svg">
                        <polygon points="26.482,25.486 25.996,25 26.482,24.514 26.482,24.514 45,5.996 44.004,5 25.486,23.518    25.486,23.518 25,24.004 5.996,5 5,5.996 24.004,25 5,44.004 5.996,45 25,25.996 28.058,29.054 28.058,29.054 44.004,45 45,44.004    26.482,25.485 " class="svg-path">
                    </svg>
                </div>
            </div>

            <div class="nav-content">
                <div class="wrapper">
                    <header class="clearfix js-controlled">
                        <a href="#Home">
                            <figure>
                                <img src="<?php echo $bg;?>">
                            </figure>
                        </a>

                        <div class="title">
                            <a href="#Home">
                                <h1>Clancy Schaer</h1>
                                <div class="blurb"><?php echo get_option( 'flyout_blurb' ); ?></div>
                            </a>
                        </div>
                    </header>
                    <nav class="primary-nav js-controlled">
                        <?php  wp_nav_menu( array( 'container' => 'false', 'menu_class' => 'list-unstyled', 'theme_location' => 'primary', 'depth' => 1 ) ); ?>
                    </nav>
                    <footer>
                        <p>
                        To request our capabilities brochure, <br class="hidden-xs">or discuss your next project, please contact:
                        </p>
                        <p>
                            <a href="<?php echo 'tel:'.get_option( 'phone_num' ); ?>"><?php echo get_option( 'phone_num' ); ?></a><br>
                            <a href="<?php echo 'mailto:'.get_option( 'admin_email' ); ?>"><?php echo get_option( 'admin_email' ); ?></a>
                        </p>
                        <div class="sns-block">
                            <a href="<?php echo get_option( 'sns_url_fb' ); ?>" target="_blank">
                                <i class="icon-facebook"></i>
                            </a>
                            <a href="<?php echo get_option( 'sns_url_in' ); ?>" target="_blank">
                                <i class="icon-linkedin"></i>
                            </a>
                            <a href="<?php echo get_option( 'sns_url_tw' ); ?>" target="_blank">
                                <i class="icon-twitter"></i>
                            </a>
                            <a href="<?php echo get_option( 'sns_url_gp' ); ?>" target="_blank">
                                <i class="icon-gplus"></i>
                            </a>
                            <a href="<?php echo get_option( 'sns_url_pin' ); ?>" target="_blank">
                                <i class="icon-pinterest"></i>
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>