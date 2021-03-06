<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    const CREATED_AT = 'created';
    const UPDATED_AT = 'updated';

    protected $primaryKey = 'messageID';
}
