/**
 * YouTube plugin for CKEditor
 *
 * @author Christian Johansson <christian@cvj.se>
 * @license MIT
 */

/**
 * Add plugin to CKEDITOR plugin-list.
 */
CKEDITOR.plugins.add('youtubevideo',
{
    init: function(editor)
    {
        CKEDITOR.dialog.add("youtubevideoDialog", function (c)
        {
            return{title: 'Enter YouTube video URL', minWidth: 400, minHeight: 75, contents: [
                {id: "tab-basic", label: "Basic Settings", elements: [
                    {type: "text", id: "youtubevideoURL", label: 'URL' }
                ]}
            ], onOk: function ()
            {
                var b = this.getValueOf("tab-basic", "youtubevideoURL").trim().match(/v=([^&$]+)/i);
                if (null == b
                    || "" == b
                    || "" == b[0]
                    || "" == b[1]
                ) {
                    alert('URL was invalid! It should be similar to \n\n\t http://www.youtube.com/watch?v=abcdef \n\n Try again!');
                    return false;
                }

                var a = c.document.createElement("iframe");
                a.setAttribute("width", "560");
                a.setAttribute("height", "315");
                a.setAttribute("src", "http://www.youtube.com/embed/" + b[1] + "?rel=0");
                a.setAttribute("frameborder", "0");
                a.setAttribute("allowfullscreen", "1");
                c.insertElement(a)

            }}
        });

        // Add command
        editor.addCommand('youtubevideoDialog', new CKEDITOR.dialogCommand("youtubevideoDialog"));

        /// Add UI toolbar button
        editor.ui.addButton('youtubevideo',
        {
            label: 'Embed YouTube video',
            command: 'youtubevideoDialog',
            icon: this.path + 'images/youtube-16x16.png'
        });

    }
});
