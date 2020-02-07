<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class User extends Model
{
    //die 2 constanten sind dafür da, dass es keine Probleme mit den Seeds gibt
    //es sucht nach "created_at" wir haben es aber umbenannt auf "created"
    //const CREATED_AT = 'created';
    //const UPDATED_AT = 'updated';

    protected $primaryKey = 'userID';
}
