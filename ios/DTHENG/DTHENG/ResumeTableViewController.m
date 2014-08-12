#import "ResumeTableViewController.h"

// author : Daniel Thengvall

@interface ResumeTableViewController ()

@end

@implementation ResumeTableViewController

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return 5;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
        case 0:
            return 170;
        case 1:
            return 440;
        case 4:
            return 300;
        default:
            return 120;
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    switch (indexPath.row) {
            
        case 0:
            return [tableView dequeueReusableCellWithIdentifier:@"yourCompanyCellPrototype" forIndexPath:indexPath];
        case 1:
            return [tableView dequeueReusableCellWithIdentifier:@"rixtyCellPrototype" forIndexPath:indexPath];
        case 2:
            return [tableView dequeueReusableCellWithIdentifier:@"artSchoolCellPrototype" forIndexPath:indexPath];
        case 3:
            return [tableView dequeueReusableCellWithIdentifier:@"startedCodingCellPrototype" forIndexPath:indexPath];
        default:
            return [tableView dequeueReusableCellWithIdentifier:@"skillsCellPrototype" forIndexPath:indexPath];


    }
}

@end