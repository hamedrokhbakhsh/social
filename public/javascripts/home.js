$(document).ready(() => {
    $.get("/api/post", (postsData, status, xhr) => {
        pushResult(postsData, $(".postContainer"))
    })
})



function pushResult(postsData, container){
    container.html("");

    postsData.forEach(data => {
        var html = appendinPost(data);

        container.append(html);
    })

    if (postsData == ""){
        container.append("<h3>Noting to See</h3>")
    }
}
