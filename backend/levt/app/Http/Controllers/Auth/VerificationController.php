<?php

namespace App\Http\Controllers\Auth;

use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\VerifiesEmails;

class VerificationController extends Controller
{
	/*
	|--------------------------------------------------------------------------
	| Email Verification Controller
	|--------------------------------------------------------------------------
	|
	| This controller is responsible for handling email verification for any
	| user that recently registered with the application. Emails may also
	| be re-sent if the user didn't receive the original email message.
	|
	*/

	use VerifiesEmails {
		verify as parentVerify;
	}

	/**
	 * Where to redirect users after verification.
	 *
	 * @var string
	 */
	protected $redirectTo = '/verified';
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('auth')->except('verify');
		$this->middleware('signed')->only('verify');
		$this->middleware('throttle:6,1')->only('verify', 'resend');
	}

	/**
	 * Mark the authenticated user's email address as verified.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 *
	 * @throws \Illuminate\Auth\Access\AuthorizationException
	 */
	public function verify(Request $request)
	{
		if ($request->user() && $request->user() != $request->route('id')) {
			Auth::logout();
		}
		
		if (! $request->user()) {
			Auth::loginUsingId($request->route('id'), true);
		}

		return $this->parentVerify($request);
	}
}