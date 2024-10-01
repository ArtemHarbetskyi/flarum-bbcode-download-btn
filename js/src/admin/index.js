import app from 'flarum/admin/app';

app.initializers.add('artemharbetskyi/flarum-bbcode-download-btn', () => {
    app.extensionData
        .for('artemharbetskyi-bbcode-download-btn')
        .registerSetting({
            setting: 'artemharbetskyi-bbcode-download-btn.cssStyleBtn',
            name: 'artemharbetskyi-bbcode-download-btn.cssStyleBtn',
            type: 'text',
            label: 'CSS Type Button',
            help: 'ex.: Button--primary or Button--primary',
        }, 20)
        .registerPermission(
            {
                icon: 'fas fa-eye-slash',
                label: app.translator.trans('flarum-bbcode-download-btn.admin.permissions.bypassGroupRequirement'),
                permission: 'artemharbetskyi-bbcode-download-btn.bypassGroupRequirement',
            },
            'view'
        );
});