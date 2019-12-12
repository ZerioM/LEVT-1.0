<html>
    <body>
        

        <form action="/uploadImage" method="POST" enctype="multipart/form-data">
            Upload Picture: <input type="file" name="picUpload" value="pic">
            <input type="text" value='{"imageID" : null,"imgSrc" :  null,"coordinateX" : null,
            "coordinateY" : null,"date" : null,"_postID" : null}' name="data">
            <input type="submit" value="Submit">
        </form>


    </body>
</html>