    <?php
    get_template_part('templates/modal','remote');
    ?>
    <!-- /container -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script>
    window.jQuery || document.write('<script src="<?php echo get_template_directory_uri(); ?>/js/lib/jquery.min.js"><\/script>')
    </script>

    <script src="<?php echo get_template_directory_uri(); ?>/js/scripts.min.js"></script>
    <?php
    wp_footer();
    ?>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-47008609-1', 'clancyschaer.com');
        ga('send', 'pageview');
    </script>
</body>

</html>
