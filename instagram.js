
$(function () {

    $("#้search").click(function () {
        var hashtag = $("#Hashtag").val();
        searchByHashtag(hashtag);
    });
    function searchByHashtag(hashtag) {
        $("#posts").empty();
        $.get(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1`, function (data, status) {
            console.log(status);
            console.log(data);

            $("#location").text(data.graphql.hashtag.name);
            //$("#location2").text(data.graphql.location.slug);
            $("#count").text(data.graphql.hashtag.edge_hashtag_to_media.count);

            //    var imgUrl = data.graphql.location.edge_location_to_top_posts.edges[0].node.display_url;
            //    $("#post").attr("src",imgUrl);

            var imgUrl = data.graphql.hashtag.edge_hashtag_to_top_posts.edges[0].node.display_url;
            for (node in data.graphql.hashtag.edge_hashtag_to_top_posts.edges) {
                var post = data.graphql.hashtag.edge_hashtag_to_top_posts.edges[node];
                console.log(post.node.display_url);

                var row = `
                    <div class="col-4" style = "padding:10px">
                            <img height = "300" width="300" src="${post.node.display_url}" alt="">
                            <div class="row">
                            <div class="col">Like: ${post.node.edge_media_preview_like.count} </div>
                            <div class="col">comments: ${post.node.edge_media_to_comment.count}</div>
                    </div>
                        <div class="row">
                            <div class="col">${post.node.edge_media_to_caption.edges[0].node.text}</div>
                        </div>

                    </div> 
                </div> `;
                $("#posts").append(row);
            }


        });
    }
})