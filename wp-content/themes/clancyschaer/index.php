<?php
get_header();
?>
    <div class="slides-container">
        <div class="slides">
            <?php
                $mypages = get_pages( array( 'sort_column' => 'menu_order', 'sort_order' => 'asc' ) );

                remove_filter( 'the_content', 'wpautop' );

                foreach( $mypages as $key=>$page ) {
                    $content = $page->post_content;
                    $slug = $page->post_name;
                    $template = rwmb_meta( 'jsp_slide_type', '', $page->ID );
                    $adpage = strstr($template, 'adpage');

                    if ($isMobile) {
                        $bgDeskRaw = rwmb_meta( 'jsp_backgroundImg', 'type=image&size=phone', $page->ID );
                    } else if ($isTablet) {
                        $bgDeskRaw = rwmb_meta( 'jsp_backgroundImg', 'type=image&size=tablet', $page->ID );
                    } else {
                        $bgDeskRaw = rwmb_meta( 'jsp_backgroundImg', 'type=image', $page->ID );
                    }
                    $bgDesk = array_values($bgDeskRaw);

                    $bgTabRaw = rwmb_meta( 'jsp_backgroundImg_tab', 'type=image&size=tablet', $page->ID );
                    $bgTab = array_values($bgTabRaw);
                    $bgTabpRaw = rwmb_meta( 'jsp_backgroundImg_tab_p', 'type=image&size=tablet', $page->ID );
                    $bgTabp = array_values($bgTabpRaw);

                    $bgMobRaw = rwmb_meta( 'jsp_backgroundImg_phone', 'type=image&size=phone', $page->ID );
                    $bgMob = array_values($bgMobRaw);
                    $bgMobpRaw = rwmb_meta( 'jsp_backgroundImg_phone_p', 'type=image&size=phone', $page->ID );
                    $bgMobp = array_values($bgMobpRaw);

                    if ($isTablet) {
                        $bg = $bgTab[0]['full_url'] ?: $bgDesk[0]['full_url'];
                    } else if ($isMobile) {
                        $bg = $bgMob[0]['full_url'] ?: $bgDesk[0]['full_url'];
                    } else {
                        $bg = $bgDesk[0]['full_url'];
                    }

                    //video bg
                    $vidBgArr = rwmb_meta( 'jsp_backgroundVid', 'type=file', $page->ID );
                    $vidBg = array_values($vidBgArr);
                    $vidImgArr = rwmb_meta( 'jsp_backgroundVidPreload', 'type=image', $page->ID );
                    $vidImg = array_values($vidImgArr);
                    $vidOverlayArr = rwmb_meta( 'jsp_backgroundVidOverlay', 'type=image', $page->ID );
                    $vidOvl = array_values($vidOverlayArr);

                    //bgColor meta
                    $bgColor = rwmb_meta( 'jsp_bgcolor', '', $page->ID );
                    $bgColorStyle = ($bgColor != '')? "background-color:{$bgColor};" : '';

                    if ($template != $slug ) {
                        $template = $slug.' '.$template;
                    }

                    if ( !$content && !$adpage) {
                        continue;
                    }

                    $content = do_shortcode( $content );

                ?>
                <section class="slide-item unselectable <?php echo $template; ?>" id="<?php echo dashesToCamelCase($slug, true);?>" style="<?php echo $bgColorStyle+';';?>">
                <?php if ($adpage) {?>

                    <div class="billboard" style="" data-deferred-img="<?php echo $bg; ?>" data-bg-desk="<?php echo $bgDesk[0]['full_url'];?>" data-bg-tab="<?php echo $bgTab[0]['full_url'];?>"  data-bg-tabp="<?php echo $bgTabp[0]['full_url'];?>"  data-bg-mob="<?php echo $bgMob[0]['full_url'];?>"  data-bg-mobp="<?php echo $bgMobp[0]['full_url'];?>">
                        <div class="floater">
                            <?php echo $content; ?>
                        </div>
                    </div>
                <?php }  else { ?>
                    <?php if ( array_filter($vidBgArr) || array_filter($vidImgArr) ) { // has video
                        $imgmetadata = wp_get_attachment_metadata($vidImg[0]["ID"]);
                    ?>

                        <?php if( $isMobile || $isTablet ) {?>

                             <div class="billboard" style="" data-deferred-img="<?php echo $bg; ?>" data-bg-desk="<?php echo $bgDesk[0]['full_url'];?>" data-bg-tab="<?php echo $bgTab[0]['full_url'];?>"  data-bg-tabp="<?php echo $bgTabp[0]['full_url'];?>"  data-bg-mob="<?php echo $bgMob[0]['full_url'];?>"  data-bg-mobp="<?php echo $bgMobp[0]['full_url'];?>">
                            </div>

                        <?php } else{ ?>

                            <div class="vid-container">
                                <img src="<?php echo $vidImg[0]['full_url']; ?>" class="bg-full" data-width="<?php echo $imgmetadata['width']?>" data-height="<?php echo $imgmetadata['height']?>">
                                <video autoplay loop poster="<?php echo $vidImg[0]['full_url']; ?>" preload='auto' class="bg-full hidden-xs hidden-sm">
                            <?php foreach($vidBgArr as $video) {
                                $metadata = wp_get_attachment_metadata($video["ID"]);
                            ?>
                                    <source src="<?php echo $video["url"]?>" type="<?php echo get_post_mime_type($video["ID"]); ?>" data-width="<?php echo $metadata['width']?>" data-height="<?php echo $metadata['height']?>">
                            <?php }//foreach ?>
                                </video>
                                <img class="overlay" src="<?php echo $vidOvl[0]['full_url']; ?>"></img>
                            </div>

                        <?php } ?>
                    <?php }//if?>
                    <div class="section-wrap">
                    <?php echo $content;?>
                    </div>
                <?php } ?>
                </section>

                <?php
                }//foreach
                ?>
        </div>
        <div class="slides-controller">
            <a class="left carousel-control hidden" id="SlideLeft">
                <span class="button">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="86.592px" height="173.184px" viewBox="0 0 86.592 173.184" enable-background="new 0 0 86.592 173.184" xml:space="preserve" class="chevron-svg chevron-svg-left">
                        <polygon points="0.9,11.3 76.2,86.6 0.9,162 0,173.2 86.6,86.6 0,0" class="chevron-svg-path">
                    </svg>
                </span>
            </a>
            <a class="right carousel-control" id="SlideRight">
                <span class="button">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="86.592px" height="173.184px" viewBox="0 0 86.592 173.184" enable-background="new 0 0 86.592 173.184" xml:space="preserve" class="chevron-svg chevron-svg-right">
                        <polygon points="0.9,11.3 76.2,86.6 0.9,162 0,173.2 86.6,86.6 0,0" class="chevron-svg-path">
                    </svg>
                </span>
            </a>
        </div>
        <?php
        get_template_part('templates/flyout');
        ?>
    </div>

<?php
get_footer();
?>