<?php

namespace App\Traits;

Trait PaginateTrait {

    public function paginate($class , $perPage = 0){
        request()->validate(['page' => 'numeric']);
        $page = request('page') ?? 1;

        if(!$perPage) $perPage = env('PER_PAGE' , 20);

        $data = $class->paginate($perPage , ['*'] , 'page' , $page);

        $result = [
            'current' => $data->currentPage(),
            'last' => $data->lastPage(),
            'total' => $data->total(),
            'perPage' => $data->perPage(),
            'hasMore' => $data->hasMorePages(),
            'items' => $data->items()
        ];

        return $result;
    }
}
