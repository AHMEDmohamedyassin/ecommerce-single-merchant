<?php

namespace App\Traits;

Trait PaginateTrait {

    public function paginate($class){      // perpage variable not used
        request()->validate([
            'page' => 'numeric' , 
            'perpage' => 'numeric|nullable'
        ]);
        $page = request('page') ?? 1;

        $perpage = request('perpage' , env('PER_PAGE' , 20));

        if(!$perpage || $perpage > env('PER_PAGE' , 20)) $perpage = env('PER_PAGE' , 20);

        $data = $class->paginate($perpage , ['*'] , 'page' , $page);

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
