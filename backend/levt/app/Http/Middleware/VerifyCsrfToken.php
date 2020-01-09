<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Indicates whether the XSRF-TOKEN cookie should be set on the response.
     *
     * @var bool
     */
    protected $addHttpCookie = true;

    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/register','/uploadImage','/newBookmark','/newPost','/newPlace','/newJourney','/allPlaces','/allGenders','/allSeasons',
        '/allActivities','/allTransports','/allCompanionships','/allJourneyCategories','/top100','/oneUser','/allBookmarkedJourneys',
        '/proveBookmarkExists','/onePost','/onePlace','/oneJourneyByPlaceID','/oneJourneyWithChildren','/oneJourneyWithChildren',
        '/oneJourney','/postsBetweenCoordinates','/filteredPosts','/userJourneys','/autocompletePlace','/validatePlace', '/updateImage',
        '/updatePost','/updatePlace','/updateJourney','/deleteBookmark','/deleteImage','/deletePost','/deletePlace','/deleteJourney'
    ];
}
