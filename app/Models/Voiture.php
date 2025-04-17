<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    protected $fillable = ['marque', 'modele', 'annee','image','user_id'];
    
}
