
var posts = document.getElementsByClassName("post");

var openPost = function() {
    var id = this.getAttribute("data-id");
    window.location.href = '/post/' + id;
};

for (var i = 0; i < posts.length; i++) {
    posts[i].addEventListener('click', openPost, false);
}
