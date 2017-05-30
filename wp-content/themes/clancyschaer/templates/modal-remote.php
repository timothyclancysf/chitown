    <!-- Modal -->
    <div class="modal fade remote-loading" id="SiteModal" tabindex="-1" role="dialog" aria-labelledby="SiteModal" aria-hidden="true">

        <div class="modal-dialog">

            <div class="modal-header">
                <h3 class="counter-title"><span class="counter-label"></span> <span class="count-current"></span><span class="count-total"></span></h3>
                <a class="modal-close text-hide" href="#SiteModal" data-dismiss="modal" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve" class="close-svg">
                        <polygon points="26.482,25.486 25.996,25 26.482,24.514 26.482,24.514 45,5.996 44.004,5 25.486,23.518    25.486,23.518 25,24.004 5.996,5 5,5.996 24.004,25 5,44.004 5.996,45 25,25.996 28.058,29.054 28.058,29.054 44.004,45 45,44.004    26.482,25.485 " class="svg-path">
                    </svg>
                </a>
            </div>

            <div id="SiteModalCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner inject">
                <!-- dynamic content -->
                </div>
            </div>
            <div class="modal-controllers">
                <a class="left carousel-control">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="86.592px" height="173.184px" viewBox="0 0 86.592 173.184" enable-background="new 0 0 86.592 173.184" xml:space="preserve" class="chevron-svg chevron-svg-left">
                        <polygon points="0.9,11.3 76.2,86.6 0.9,162 0,173.2 86.6,86.6 0,0" class="chevron-svg-path">
                    </svg>
                </a>
                <a class="right carousel-control">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="86.592px" height="173.184px" viewBox="0 0 86.592 173.184" enable-background="new 0 0 86.592 173.184" xml:space="preserve" class="chevron-svg chevron-svg-right">
                        <polygon points="0.9,11.3 76.2,86.6 0.9,162 0,173.2 86.6,86.6 0,0" class="chevron-svg-path">
                    </svg>
                </a>
            </div>
            <div class="loader vcenter-parent">
                <div class="vcenter-child"  id="LoadingIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="97" height="97" viewBox="0 0 97 97" enable-background="new 0 0 97 97" xml:space="preserve" class="loading-icon">
                        <g opacity="0.5">
                            <path fill="#FFFFFF" d="M90.5 37.2c6.2 23.2-7.5 47.1-30.7 53.3S12.8 83 6.5 59.8C0.3 36.6 14 12.8 37.2 6.5 60.4 0.3 84.3 14 90.5 37.2" />
                        </g>
                        <g opacity="0.2">
                            <path fill="#010101" d="M48.5 97c-21.9 0-41.1-14.8-46.8-35.9C-5.3 35.3 10.1 8.6 35.9 1.7 40 0.6 44.3 0 48.5 0 70.4 0 89.6 14.8 95.3 35.9c7 25.8-8.4 52.5-34.2 59.4C57 96.5 52.7 97 48.5 97M48.5 1.9c-4.1 0-8.2 0.5-12.1 1.6C11.6 10.2-3.2 35.8 3.5 60.6c5.5 20.3 24 34.5 45 34.5 4.1 0 8.2-0.5 12.1-1.6 24.8-6.7 39.5-32.3 32.9-57.1C88 16.1 69.5 1.9 48.5 1.9" />
                        </g>
                        <g opacity="0.3">
                            <rect x="26.5" y="26" transform="matrix(6.436864e-004 1 -1 6.436864e-004 75.4554 -21.4883)" fill="#231F20" width="44" height="2" />
                            <animateTransform id="loadHand" attributeName="transform"
                                type="rotate"
                                from="0 48.5 48.5" to="360 48.5 48.5"
                                begin="indefinite" dur="10s"
                                repeatCount="indefinite"
                            />
                        </g>
                    </svg>
                    <!-- <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMywgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBvcGFjaXR5PSIwLjI1IiBmaWxsPSIjRkZGRkZGIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZD0iTTE2LDBDNy4xNjQsMCwwLDcuMTY0LDAsMTZjMCw4LjgzNiw3LjE2NCwxNiwxNiwxNgoJYzguODM2LDAsMTYtNy4xNjQsMTYtMTZDMzIsNy4xNjQsMjQuODM2LDAsMTYsMCBNMTYsNGM2LjYyNywwLDEyLDUuMzczLDEyLDEyYzAsNi42MjctNS4zNzMsMTItMTIsMTJDOS4zNzMsMjgsNCwyMi42MjcsNCwxNgoJQzQsOS4zNzMsOS4zNzMsNCwxNiw0Ii8+CjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xNiwwYzguODM2LDAsMTYsNy4xNjQsMTYsMTZoLTRjMC02LjYyNy01LjM3My0xMi0xMi0xMlYweiI+CjxhbmltYXRlVHJhbnNmb3JtICBmaWxsPSJyZW1vdmUiIHR5cGU9InJvdGF0ZSIgcmVzdGFydD0iYWx3YXlzIiBjYWxjTW9kZT0ibGluZWFyIiBhZGRpdGl2ZT0icmVwbGFjZSIgYWNjdW11bGF0ZT0ibm9uZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMC44cyIgdG89IjM2MCAxNiAxNiIgZnJvbT0iMCAxNiAxNiIgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIj4KCQk8L2FuaW1hdGVUcmFuc2Zvcm0+CjwvcGF0aD4KPC9zdmc+" alt="Loading..."> -->
                </div>
            </div>
        </div>
    </div>