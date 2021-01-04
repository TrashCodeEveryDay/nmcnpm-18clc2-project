const express = require('express');
const categoryModel = require('../models/product_modle');
const router = express.Router();
const {paginate}=require('../config/default.json')

router.get('/keyword/:txt',async function (req, res){
  const txtSearch=req.params.txt
  //chưa xong
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;
  const list = await categoryModel.getCateListByPage(catId,offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.post('/',async function (req, res,next){
  const link='/search/keyword/'+req.body.contentSearch;
  res.redirect(link);
})




router.get('/:id', async function (req, res) {
  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;
  const list = await categoryModel.getCateListByPage(catId,offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/rating-5', async function (req, res) {
  const catId=req.params.id;

  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat_5star(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;
  
  const list = await categoryModel.get5starCourse(catId,offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_5: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/rating-up-4', async function (req, res) {
  const catId=req.params.id;

  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat_Up4star(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.getUp4starCourse(catId, offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_up_4: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/rating-up-3', async function (req, res) {
  const catId=req.params.id;

  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat_Up3star(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.getUp3starCourse(catId, offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_up_3: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/rating-down-3', async function (req, res) {
  const catId=req.params.id;

  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat_Down3star(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.getDown3starCourse(catId, offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_down_3: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/most-study', async function (req, res) {
  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.mostStudyByCatID(catId, offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_m_st: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/most-overall', async function (req, res) {
  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.mostOverallByCatID(catId, offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_m_ov: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/price-ascend', async function (req, res) {
  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.ascPriceByCatID(catId, offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_m_ap: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})

router.get('/:id/price-descend', async function (req, res) {
  const catId=req.params.id;
  const page=req.query.page || 1;
  const previousPage=+page-1;
  const nextPage=+page+1;
  if (page<1){
    page=1;
  }
  const total=await categoryModel.countByCat(catId);
  let nPages=Math.floor(total/paginate.limit);
  if (total %paginate.limit>0)
  {
    nPages++;
  }
  const page_numbers=[];

  for (i=1;i<=nPages;i++)
  {
    page_numbers.push({
      value: i,
      isCurrentPage: i=== +page,
    });
  }

  const offset=(page-1)*paginate.limit;

  const list = await categoryModel.descPriceByCatID(catId, offset);
  res.render('search_site', {
    product_popular: list,
    empty: list.length === 0,
    cateId: {
      Id:catId,
      active_m_dp: true
    },
    page_numbers,
    previousPage,
    nextPage,
    checkNextPage: nextPage<=nPages,
    checkPreviousPage: previousPage>0,
    layout: "search-item.hbs",
  });
})
module.exports = router;  