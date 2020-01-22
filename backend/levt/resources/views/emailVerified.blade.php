@extends('layouts.app')

@section('content')
<html>
<head>
<link rel="stylesheet" type="text/css" href="{{ asset('/css/style.css') }}" />
</head>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"></div>
                Your Email is validated. Please login to your Levt app!
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    
                </div>
            </div>
        </div>
    </div>
</div>
</html>
@endsection
