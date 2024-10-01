import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import TextEditor from 'flarum/common/components/TextEditor';
import TextEditorButton from 'flarum/common/components/TextEditorButton';
import CommentPost from 'flarum/forum/components/CommentPost';

app.initializers.add('artemharbetskyi/flarum-bbcode-download-btn', () => {

  // add button bbcode and permission verify in editor
  extend(TextEditor.prototype, 'toolbarItems', function (items) {
    // Проверка на авторизацию пользователя и атрибут форума
    if (app.forum.attribute('canViewDownloadButton')) {
      items.add('bbextend-download-btn', (
        <TextEditorButton onclick={() => this.attrs.composer.editor.insertAtCursor('[download_link link="https://" size="1GB" name="download.zip"]')} icon="fas fa-cloud-download-alt">
          Add Download button
        </TextEditorButton>
      ));
    }
  });

  // Open download link in new tab
  extend(CommentPost.prototype, ['oncreate', 'onupdate'], function () {
    const postBody = this.element.querySelector('.Post-body');
    const linkTag = postBody.querySelectorAll('.ext-button-download');

    linkTag.forEach((link) => {
      link.setAttribute("target", "_");
    });
  });
});
