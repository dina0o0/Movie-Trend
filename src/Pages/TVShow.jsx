import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../Styles/GlobalPages.scss";
import defaultPosterPath from "../Assets/Image/defaultPoster.jpeg";
import NoResult from "../Assets/Image/No Result.png";
import Details from "../Assets/Image/Details.png";
import MoonLoader from "react-spinners/MoonLoader";

export default function person() {
  // تعريف الحالة لتخزين الأفلام
  const [TV, setTV] = useState([]);
  // تعريف الحالة لتخزين عدد الصفحات
  const [setPageCount] = useState(0);
  // تعريف الحالة لتخزين الصفحة الحالية من localStorage أو الصفحة الأولى إذا لم يكن هناك قيمة محفوظة
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPageTV"), 10) || 1
  );
  // تعريف الحالة لتحديد ما إذا كان يتم تحميل البيانات
  const [loading, setLoading] = useState(true);
  // تعريف الحالة لتخزين استعلام البحث من localStorage أو قيمة فارغة
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQueryTV") || ""
  );
  // تعريف الحالة لتخزين نتائج البحث
  const [searchResults, setSearchResults] = useState([]);
  // تعريف الحالة لتخزين اقتراحات البحث
  // const [searchSuggestions, setSearchSuggestions] = useState([]);
  // تعريف الحالة لتحديد العنصر المميز في الاقتراحات
  // const [highlightedIndex, setHighlightedIndex] = useState(-1);
  // تعريف الحالة لتحديد ما إذا كان سيتم تعطيل الترقيم
  const [disablePagination, setDisablePagination] = useState(false);
  // تعريف الحالة لتحديد ما إذا كانت الاقتراحات مغلقة من localStorage
  // const [isSuggestionsClosed, setIsSuggestionsClosed] = useState(
  //     localStorage.getItem('isSuggestionsClosed') === 'true'
  // );
  // لغلق اقتراحات البحث عند الضغط خارجها
  // const searchContainerRef = useRef(null);
  // const suggestionRefs = useRef([]);

  let mediaType = "tv";

  // API TVShow
  async function getTVShow(page) {
    setLoading(true);
    try {
      const requests = [
        axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&page=${page}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&page=${
            page + 1
          }`
        ),
      ];
      // Promise انتظار جميع الطلبات لجلب البيانات
      const responses = await Promise.all(requests);
      // FlatMap تجميع كل البيانات فى مكان واحد
      const results = responses.flatMap((response) => response.data.results);
      setTV(results.slice(0, 24)); // أخذ أول 24 نتيجة فقط
      setPageCount(responses[0].data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching person:", error);
      setLoading(false);
    }
  }
  // API Search
  async function searchPerson(query) {
    setLoading(true);
    try {
      const requests = [
        axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&include_adult=false&query=${query}&page=1`
        ),
        axios.get(
          `https://api.themoviedb.org/3/search/tv?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&include_adult=false&query=${query}&page=2`
        ),
      ];
      const responses = await Promise.all(requests);
      const results = responses.flatMap((response) => response.data.results);

      setSearchResults(results.slice(0, 24));
      // تعيين اقتراحات البحث باستخدام النتائج
      // setSearchSuggestions(results.slice(0, 24).map(item => ({
      //   title: item.title,
      //   poster_path: item.poster_path
      // })));
      setLoading(false);
    } catch (error) {
      console.error("Error searching person:", error);
      setLoading(false);
    }
  }

  // استخدام تأثيرات جانبية (useEffect) لجلب البيانات عند تغيير الصفحة الحالية أو استعلام البحث
  useEffect(() => {
    // trim، حيث تم إزالة جميع الفراغات الزائدة من البحث عند الكتابة
    if (searchQuery.trim() !== "") {
      searchPerson(searchQuery); // البحث إذا كان هناك استعلام
      setDisablePagination(true); // تعطيل الترقيم في حالة البحث
    } else {
      getTVShow(currentPage); // جلب الأفلام إذا لم يكن هناك استعلام
      setDisablePagination(false); // تمكين الترقيم في حالة عدم البحث
    }
  }, [currentPage, searchQuery]);
  // لحفظ رقم الصفحة
  useEffect(() => {
    localStorage.setItem("currentPageTV", currentPage);
  }, [currentPage]);

  // لغلق اقتراحات البحث عند الضغط خارجها
  // useEffect(() => {
  //   // دالة تنفيذ عند النقر خارج عنصر البحث
  //   const handleClickOutside = (event) => {
  //     // التأكد من وجود مرجع لعنصر البحث وأن النقر لم يكن داخله
  //     if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
  //       // إغلاق اقتراحات البحث عند النقر خارج عنصر البحث
  //       setSearchSuggestions([]);
  //       // تعيين حالة إغلاق الاقتراحات إلى true في حالة تم ضبطها على false سابقًا
  //       setIsSuggestionsClosed(true);
  //       // حفظ حالة إغلاق الاقتراحات في localStorage لاسترجاعها في حالة إعادة تحميل الصفحة
  //       localStorage.setItem('isSuggestionsClosed', 'true');
  //     }
  //   };

  //   // إضافة مستمع حدث النقر إلى المستند عند تحميل المكون
  //   document.addEventListener('mousedown', handleClickOutside);
  //   // تنظيف المستمع عند إزالة المكون أو تحديثه
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []); // مصفوفة الاعتماديات فارغة، لذا يتم تنفيذ الكود مرة واحدة فقط عند تحميل المكون

  const handlePageClick = (data) => {
    // تعيين حالة التحميل لتفعيل عرض مؤشر التحميل أو رسالة التحميل
    setLoading(true);
    // حساب الصفحة المختارة من البيانات المسترجعة
    let selectedPage = data.selected + 1;
    // تعيين الصفحة الحالية في الحالة لتحديث المكون
    setCurrentPage(selectedPage);
    // إيقاف حالة التحميل بمجرد إعادة التحديث أو التحميل
    setLoading(false);
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'ArrowDown') {
  //     // إدارة سلوك السهم لأسفل
  //     e.preventDefault(); // منع السلوك الافتراضي للمفتاح لتجنب التمرير
  //     setHighlightedIndex((prevIndex) => {
  //       const newIndex = (prevIndex + 1) % searchSuggestions.length; // حساب الفهرس المؤشر عليه الجديد
  //       suggestionRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // تمرير العنصر إلى العرض المرئي
  //       return newIndex; // إرجاع الفهرس المؤشر عليه الجديد
  //     });
  //   } else if (e.key === 'ArrowUp') {
  //     // إدارة سلوك السهم لأعلى
  //     e.preventDefault(); // منع السلوك الافتراضي للمفتاح لتجنب التمرير
  //     setHighlightedIndex((prevIndex) => {
  //       const newIndex = (prevIndex - 1 + searchSuggestions.length) % searchSuggestions.length; // حساب الفهرس المؤشر عليه الجديد
  //       suggestionRefs.current[newIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // تمرير العنصر إلى العرض المرئي
  //       return newIndex; // إرجاع الفهرس المؤشر عليه الجديد
  //     });
  //   } else if (e.key === 'Enter') {
  //     // إدارة سلوك مفتاح Enter
  //     if (highlightedIndex >= 0 && highlightedIndex < searchSuggestions.length) {
  //       const selectedSuggestion = searchSuggestions[highlightedIndex].title; // اختيار الاقتراح المحدد
  //       setSearchQuery(selectedSuggestion); // تعيين الاقتراح المحدد كقيمة لعنصر البحث
  //       localStorage.setItem('searchQuery', selectedSuggestion); // حفظ الاقتراح المحدد في localStorage
  //     }
  //     setSearchSuggestions([]); // إعادة تعيين قائمة الاقتراحات
  //     setIsSuggestionsClosed(true); // تعيين حالة إغلاق الاقتراحات إلى true
  //     localStorage.setItem('isSuggestionsClosed', 'true'); // حفظ حالة إغلاق الاقتراحات في localStorage
  //   }
  // };
  // const handleSuggestionClick = (suggestion) => {
  //   setSearchQuery(suggestion.title); // تعيين عنوان الاقتراح المختار كقيمة لحقل البحث
  //   localStorage.setItem('searchQuery', suggestion.title); // حفظ عنوان الاقتراح المختار في localStorage
  //   setSearchSuggestions([]); // إعادة تعيين قائمة الاقتراحات لتكون فارغة
  //   setIsSuggestionsClosed(true); // تعيين حالة إغلاق الاقتراحات إلى true
  // };

  return (
    <>
      {loading ? (
        <div className="Layout">
          {" "}
          <MoonLoader size={80} color={"#fe1f20"} loading={loading} />{" "}
        </div>
      ) : (
        <div className="container">
          {/* ref={searchContainerRef} لغلق الاقتراحات من خلال الضغط على الفراغ */}
          {/* خاص بالحقل */}
          {/* <div className='search-container' ref={searchContainerRef}> */}
          <div className="search-container">
            <div className="search-input-container">
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value; // يُسترجع القيمة المُدخلة في حقل البحث
                  setSearchQuery(value); // يُحدث الحالة الخاصة بالبحث بالقيمة الجديدة
                  localStorage.setItem("searchQueryTV", value); // يُخزن قيمة البحث في localStorage
                  // setSearchSuggestions([]); // يُعيد تعيين قائمة اقتراحات البحث لتكون فارغة
                  // setIsSuggestionsClosed(false); // يُفتح قائمة الاقتراحات (إذا كانت مُغلقة)
                  if (value === "") {
                    localStorage.removeItem("searchQueryTV"); // يُزيل مفتاح 'searchQuery' من localStorage إذا كانت القيمة فارغة
                  }
                }}
                // onKeyDown={handleKeyDown}
                placeholder="Enter the movie name ..."
              />
            </div>
            {/* خاص بالاقتراحات اللى بتظهر فى القائمة */}
            {/* إذا لم تكن القائمة مغلقة (!isSuggestionsClosed) وإذا كان هناك عناصر في قائمة الاقتراحات (searchSuggestions.length > 0). */}
            {/* {!isSuggestionsClosed && searchSuggestions.length > 0 && (
            <div className='search-suggestions'>
              {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    ref={(el) => (suggestionRefs.current[index] = el)}
                    className={`search-suggestion ${index === highlightedIndex ? 'highlighted' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <LazyLoadImage
                      src={suggestion.poster_path ? 'https://image.tmdb.org/t/p/w500' + suggestion.poster_path : defaultPosterPath}
                      alt={suggestion.title}
                      effect='blur'
                      className='suggestion-image'
                    />
                    <span className='suggestion-title'>{suggestion.title}</span>
                  </div>
              ))}
            </div>
          )} */}
          </div>
          <div className="content-media">
            <div className="row gy-3">
              {loading ? (
                <div className="Layout">
                  {" "}
                  <MoonLoader
                    size={80}
                    color={"#fe1f20"}
                    loading={loading}
                  />{" "}
                </div>
              ) : // خاص بنتيجة البحث
              // يتحقق من أن قيمة searchQuery ليست فارغة بعد إزالة الفراغات الزائدة.
              searchQuery.trim() !== "" ? (
                // بمجرد تحقق الشرط الأول، يتم التحقق من وجود عناصر في searchResults، مما يعني أن هناك نتائج يمكن عرضها.
                searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                    <div key={index} className="col-md-2 media-info">
                      <Link to={`/itemsdetails/${item.id}/${mediaType}`}>
                        <div className="image-link">
                          <LazyLoadImage
                            src={
                              item.poster_path
                                ? "https://image.tmdb.org/t/p/w500" +
                                  item.poster_path
                                : defaultPosterPath
                            }
                            alt={item.name}
                            effect="blur"
                          />
                          <div className="overlay">
                            <div className="details">
                              <LazyLoadImage
                                src={Details}
                                alt={item.name}
                                effect="blur"
                              />
                              <p>details</p>
                            </div>
                            <p className="name-item">
                              {item.name
                                .split(" ")
                                .slice(0, 7)
                                .map((word, index) => (
                                  <div key={index} className="word">
                                    {word}
                                  </div>
                                ))}
                            </p>
                          </div>
                        </div>
                        <p className="media-rating">
                          {item.vote_average
                            ? item.vote_average.toFixed(1)
                            : "N/A"}
                        </p>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-md-12 no-result">
                    <div>
                      <LazyLoadImage src={NoResult} alt="" />
                      <p>No TVshow found matching your search ...</p>
                    </div>
                  </div>
                )
              ) : (
                TV.map((item, index) => (
                  <div key={index} className="col-md-2 media-info">
                    <Link to={`/itemsdetails/${item.id}/${mediaType}`}>
                      <div className="image-link">
                        <LazyLoadImage
                          src={
                            item.poster_path
                              ? "https://image.tmdb.org/t/p/w500" +
                                item.poster_path
                              : defaultPosterPath
                          }
                          alt={item.title}
                          effect="blur"
                        />
                        <div className="overlay">
                          <div className="details">
                            <LazyLoadImage
                              src={Details}
                              alt={item.name}
                              effect="blur"
                            />
                            <p>details</p>
                          </div>
                          <p className="name-item">
                            {item.name
                              .split(" ")
                              .slice(0, 7)
                              .map((word, index) => (
                                <div key={index} className="word">
                                  {word}
                                </div>
                              ))}
                          </p>
                        </div>
                      </div>
                      <p className="media-rating">
                        {item.vote_average
                          ? item.vote_average.toFixed(1)
                          : "N/A"}
                      </p>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
          {!disablePagination && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={450}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              forcePage={currentPage - 1}
            />
          )}
        </div>
      )}
    </>
  );
}
