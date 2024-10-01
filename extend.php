<?php

/*
 * This file is part of ArtemHarbetskyi/flarum-bbcode-download-btn.
 *
 * Copyright (c) 2024 ArtemHarbetskyi.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace ArtemHarbetskyi\BBCodeDownloadButton;

use Flarum\Extend;
use s9e\TextFormatter\Configurator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Serializer\ForumSerializer;

return [

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attribute('canViewDownloadButton', function (ForumSerializer $serializer) {
            return $serializer->getActor()->can('artemharbetskyi-bbcode-download-btn.bypassGroupRequirement');
        }),

    (new Extend\Formatter)
        ->configure(function (Configurator $config) {
            $settings = resolve(SettingsRepositoryInterface::class);

            $bgClassOne = $settings->get('artemharbetskyi-bbcode-download-btn.cssStyleBtn', 'Button--primary');

            // $bgClassTwo

            $bbcode = '<div class="ext-button-download-container">
                            <a href="{URL}" class="ext-button-download">
                                <div class="ic"><i class="fas fa-download"></i></div>
                                <div class="nm">{TEXT2} <i class="fas fa-external-link-alt"></i></div>
                                <div class="sz">{TEXT1}</div>
                            </a>
                        </div>';

            $config->BBCodes->addCustom(
                '[download_link link={URL} size={TEXT1} name={TEXT2}][/download_link]',
                $bbcode
            );
        }),

];
