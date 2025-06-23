insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'İstanbul Havalimanı', 'İstanbul', 'IST');
insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'Bakırköy', 'İstanbul', 'BAKIR');
insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'Denizli Havalimanı', 'Denizli', 'DEZ');
insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'Antalya Havalimanı', 'Antalya', 'ANT');
insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'Ankara Havalimanı', 'Ankara', 'ANK');
insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'Kaçiören', 'Keçiören', 'KECI');
insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'Amasya Havalimanı', 'Amasya', 'AMS');
insert into location(id, name, city, location_code)
values (NEXTVAL('location_sequence'), 'Diyarbakır Havalimanı', 'Diyarbakır', 'DIY');


insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'BAKIR'), (select id from location where location_code = 'IST'), 2);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'IST'), (select id from location where location_code = 'DEZ'), 0);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'IST'), (select id from location where location_code = 'ANT'), 0);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'IST'), (select id from location where location_code = 'ANK'), 0);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'IST'), (select id from location where location_code = 'AMS'), 0);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'IST'), (select id from location where location_code = 'DIY'), 0);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'ANT'), (select id from location where location_code = 'KECI'), 1);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'ANK'), (select id from location where location_code = 'KECI'), 3);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'AMS'), (select id from location where location_code = 'KECI'), 1);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'DIY'), (select id from location where location_code = 'AMS'), 0);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'ANK'), (select id from location where location_code = 'DIY'), 0);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'DIY'), (select id from location where location_code = 'KECI'), 2);
insert into transportation(id, origin_location_id, destination_location_id, transportation_type)
values (NEXTVAL('transportation_sequence'), (select id from location where location_code = 'BAKIR'), (select id from location where location_code = 'KECI'), 1);