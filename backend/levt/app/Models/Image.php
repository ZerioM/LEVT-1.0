<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    const CREATED_AT = 'created';
    const UPDATED_AT = 'updated';
    
    protected $primaryKey = 'imageID';
}
